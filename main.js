// ─── Toast ────────────────────────────────────────────────────────────────────
function showToast(message, type = "info") {
  const existing = document.getElementById("toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  toast.style.cssText = `
    position:fixed;top:80px;left:50%;transform:translateX(-50%);
    padding:10px 20px;border-radius:8px;font-size:0.9rem;z-index:9999;
    background:${type === "error" ? "var(--red)" : "var(--primary)"};
    color:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.4);
    animation:fadeIn 0.2s ease;pointer-events:none;white-space:nowrap;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ─── State ────────────────────────────────────────────────────────────────────
let currentCategory = "全部";
let searchQuery = "";
let currentView = "grid"; // "grid" | "compare"
let selectedForCompare = []; // max 4 agent ids

// ─── DOM refs ─────────────────────────────────────────────────────────────────
const gridView = document.getElementById("grid-view");
const compareView = document.getElementById("compare-view");
const agentsContainer = document.getElementById("agents-container");
const compareTableContainer = document.getElementById("compare-table-container");
const compareBar = document.getElementById("compare-bar");
const compareItemsEl = document.getElementById("compare-items");
const compareHint = document.getElementById("compare-hint");
const searchInput = document.getElementById("search-input");
const filterTagsEl = document.getElementById("filter-tags");
const viewBtnGrid = document.getElementById("view-btn-grid");
const viewBtnCompare = document.getElementById("view-btn-compare");
const modalOverlay = document.getElementById("modal-overlay");
const heroCount = document.getElementById("hero-count");

// ─── Init ─────────────────────────────────────────────────────────────────────
function init() {
  heroCount.textContent = AGENTS.length;
  renderFilterTags();
  renderAgents();
  setupEvents();
}

// ─── Filter tags ──────────────────────────────────────────────────────────────
function renderFilterTags() {
  filterTagsEl.innerHTML = CATEGORIES.map(
    (cat) =>
      `<button class="filter-tag ${cat === currentCategory ? "active" : ""}" data-cat="${cat}">${cat}</button>`
  ).join("");

  filterTagsEl.querySelectorAll(".filter-tag").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentCategory = btn.dataset.cat;
      filterTagsEl
        .querySelectorAll(".filter-tag")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderAgents();
    });
  });
}

// ─── Render agents ────────────────────────────────────────────────────────────
function filteredAgents() {
  return AGENTS.filter((a) => {
    const matchCat =
      currentCategory === "全部" || a.category.includes(currentCategory);
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      a.name.toLowerCase().includes(q) ||
      a.vendor.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });
}

function renderAgents() {
  const agents = filteredAgents();

  if (agents.length === 0) {
    agentsContainer.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="icon">🔍</div>
        <p>没有找到匹配的 Agent</p>
      </div>`;
    return;
  }

  agentsContainer.innerHTML = agents
    .map((a, i) => renderAgentCard(a, i))
    .join("");

  // Bind card events
  agentsContainer.querySelectorAll(".agent-card").forEach((card) => {
    const id = card.dataset.id;

    // Click on card → detail modal (but not on checkbox)
    card.addEventListener("click", (e) => {
      if (e.target.closest(".compare-checkbox")) return;
      openModal(id);
    });

    // Compare checkbox
    const cb = card.querySelector(".compare-cb");
    cb.checked = selectedForCompare.includes(id);
    cb.addEventListener("change", () => {
      toggleCompare(id, cb.checked);
    });
  });
}

function renderAgentCard(agent, idx) {
  const featKeys = ["codeCompletion", "chat", "agentMode", "multiFile", "webSearch"];
  const featChips = featKeys
    .map((k) => {
      const yes = agent.features[k];
      return yes
        ? `<span class="feature-chip yes">✓ ${FEATURE_LABELS[k]}</span>`
        : "";
    })
    .join("");

  const isSelected = selectedForCompare.includes(agent.id);
  const isPopular = agent.popular;

  return `
    <div class="agent-card" data-id="${agent.id}" style="animation-delay:${idx * 40}ms">
      <div class="card-header">
        <div class="agent-logo" style="background:${agent.logoColor}">${agent.logoFallback}</div>
        <div class="card-title">
          <h3>${agent.name}</h3>
          <span class="vendor">${agent.vendor}</span>
        </div>
        ${isPopular ? '<span class="card-badge hot">🔥 热门</span>' : ""}
      </div>

      <p class="agent-desc">${agent.description}</p>

      <div class="agent-features">${featChips}</div>

      <div class="tag-list">
        ${agent.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
      </div>

      <div class="card-footer">
        <div class="pricing-label">
          ${agent.pricing.free ? `<span class="free">免费可用</span>` : ""}
          ${agent.pricing.paid !== "—" ? ` · ${agent.pricing.paid}` : ""}
        </div>
        <div class="rating">★ ${agent.rating}</div>
      </div>

      <div style="margin-top:12px">
        <label class="compare-checkbox">
          <input type="checkbox" class="compare-cb" ${isSelected ? "checked" : ""}/>
          加入对比
        </label>
      </div>
    </div>`;
}

// ─── Compare logic ────────────────────────────────────────────────────────────
function toggleCompare(id, add) {
  if (add) {
    if (selectedForCompare.length >= 4) {
      showToast("最多同时对比 4 个 Agent", "error");
      // uncheck
      const cb = agentsContainer.querySelector(`[data-id="${id}"] .compare-cb`);
      if (cb) cb.checked = false;
      return;
    }
    if (!selectedForCompare.includes(id)) selectedForCompare.push(id);
  } else {
    selectedForCompare = selectedForCompare.filter((x) => x !== id);
  }
  updateCompareBar();
}

function updateCompareBar() {
  if (selectedForCompare.length === 0) {
    compareBar.classList.add("hidden");
    return;
  }
  compareBar.classList.remove("hidden");

  compareItemsEl.innerHTML = selectedForCompare
    .map((id) => {
      const a = AGENTS.find((x) => x.id === id);
      return `
        <span class="compare-item-tag">
          ${a.name}
          <button onclick="removeFromCompare('${id}')" title="移除" aria-label="移除 ${a.name}">×</button>
        </span>`;
    })
    .join("");

  compareHint.textContent =
    selectedForCompare.length < 2
      ? `还需选择 ${2 - selectedForCompare.length} 个`
      : `已选 ${selectedForCompare.length} 个，点击"开始对比"查看详细对比`;
}

function removeFromCompare(id) {
  selectedForCompare = selectedForCompare.filter((x) => x !== id);
  updateCompareBar();
  // uncheck the card
  const cb = agentsContainer.querySelector(`[data-id="${id}"] .compare-cb`);
  if (cb) cb.checked = false;
  // if currently in compare view, re-render
  if (currentView === "compare") renderCompareTable();
}

window.removeFromCompare = removeFromCompare;

function startCompare() {
  if (selectedForCompare.length < 2) {
    showToast("请至少选择 2 个 Agent 进行对比", "error");
    return;
  }
  currentView = "compare";
  gridView.style.display = "none";
  compareView.style.display = "block";
  viewBtnGrid.classList.remove("active");
  viewBtnCompare.classList.add("active");
  renderCompareTable();
  compareView.scrollIntoView({ behavior: "smooth" });
}

window.startCompare = startCompare;

function clearCompare() {
  selectedForCompare = [];
  updateCompareBar();
  agentsContainer.querySelectorAll(".compare-cb").forEach((cb) => (cb.checked = false));
}

window.clearCompare = clearCompare;

// ─── Compare Table ────────────────────────────────────────────────────────────
function renderCompareTable() {
  const agents = selectedForCompare.map((id) => AGENTS.find((a) => a.id === id));

  const featRows = Object.keys(FEATURE_LABELS)
    .map((k) => {
      const cells = agents
        .map(
          (a) =>
            `<td class="center">${
              a.features[k]
                ? '<span class="check-yes">✓</span>'
                : '<span class="check-no">—</span>'
            }</td>`
        )
        .join("");
      return `<tr><td class="row-label">${FEATURE_LABELS[k]}</td>${cells}</tr>`;
    })
    .join("");

  const rows = [
    {
      label: "厂商",
      fn: (a) => a.vendor,
    },
    {
      label: "定价（免费）",
      fn: (a) =>
        a.pricing.free
          ? `<span style="color:var(--green)">${a.pricing.freeDetail}</span>`
          : "无免费版",
    },
    {
      label: "付费版",
      fn: (a) => a.pricing.paid,
    },
    {
      label: "企业版",
      fn: (a) => a.pricing.enterprise,
    },
    {
      label: "上下文窗口",
      fn: (a) => a.contextWindow,
    },
    {
      label: "底层模型",
      fn: (a) => a.model,
    },
    {
      label: "支持 IDE",
      fn: (a) => a.ides.join("、"),
    },
    {
      label: "语言支持",
      fn: (a) => a.languages,
    },
    {
      label: "评分",
      fn: (a) => `<span style="color:var(--yellow)">★ ${a.rating}</span>`,
    },
  ];

  const headerCells = agents
    .map(
      (a) => `
      <th class="agent-col-header">
        <div class="agent-logo" style="background:${a.logoColor}">${a.logoFallback}</div>
        <div class="name">${a.name}</div>
        <div class="vendor">${a.vendor}</div>
      </th>`
    )
    .join("");

  const basicRows = rows
    .map((r) => {
      const cells = agents.map((a) => `<td>${r.fn(a)}</td>`).join("");
      return `<tr><td class="row-label">${r.label}</td>${cells}</tr>`;
    })
    .join("");

  const prosConsRows = agents
    .map((a) => {
      const pros = a.pros.map((p) => `<li>${p}</li>`).join("");
      const cons = a.cons.map((c) => `<li>${c}</li>`).join("");
      return `
        <td>
          <ul class="pros-list" style="margin-bottom:8px">${pros}</ul>
          <ul class="cons-list">${cons}</ul>
        </td>`;
    })
    .join("");

  compareTableContainer.innerHTML = `
    <div class="compare-table-wrap">
      <table class="compare-table">
        <thead>
          <tr>
            <th class="row-label">对比项目</th>
            ${headerCells}
          </tr>
        </thead>
        <tbody>
          <tr><td class="row-label" colspan="${agents.length + 1}" style="color:var(--primary-light);font-size:0.78rem;padding:10px 18px">基本信息</td></tr>
          ${basicRows}
          <tr><td class="row-label" colspan="${agents.length + 1}" style="color:var(--primary-light);font-size:0.78rem;padding:10px 18px">功能支持</td></tr>
          ${featRows}
          <tr>
            <td class="row-label">优劣势</td>
            ${prosConsRows}
          </tr>
        </tbody>
      </table>
    </div>`;
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────
function openModal(id) {
  const a = AGENTS.find((x) => x.id === id);
  if (!a) return;

  const featRows = Object.keys(FEATURE_LABELS)
    .map(
      (k) => `
      <div class="feature-row">
        <span class="label">${FEATURE_LABELS[k]}</span>
        ${a.features[k] ? '<span class="check-yes">✓</span>' : '<span class="check-no">—</span>'}
      </div>`
    )
    .join("");

  document.getElementById("modal-content").innerHTML = `
    <div class="modal-header">
      <div class="agent-logo" style="background:${a.logoColor};width:52px;height:52px">${a.logoFallback}</div>
      <div class="modal-header-info">
        <h2>${a.name}</h2>
        <div class="vendor">${a.vendor} · <span style="color:var(--yellow)">★ ${a.rating}</span></div>
      </div>
      <button class="modal-close" onclick="closeModal()">✕</button>
    </div>
    <div class="modal-body">
      <div class="modal-section">
        <h4>简介</h4>
        <p>${a.description}</p>
      </div>

      <div class="modal-section">
        <h4>功能特性</h4>
        <div class="features-grid">${featRows}</div>
      </div>

      <div class="modal-section">
        <h4>定价方案</h4>
        <div class="pricing-cards">
          <div class="pricing-card">
            <div class="tier">免费版</div>
            <div class="price free-price">${a.pricing.freeDetail || "无"}</div>
          </div>
          <div class="pricing-card">
            <div class="tier">付费版</div>
            <div class="price">${a.pricing.paid}</div>
          </div>
          <div class="pricing-card">
            <div class="tier">企业版</div>
            <div class="price">${a.pricing.enterprise}</div>
          </div>
        </div>
      </div>

      <div class="modal-section">
        <h4>技术规格</h4>
        <div class="features-grid">
          <div class="feature-row"><span class="label">底层模型</span><span>${a.model}</span></div>
          <div class="feature-row"><span class="label">上下文窗口</span><span>${a.contextWindow}</span></div>
          <div class="feature-row"><span class="label">语言支持</span><span>${a.languages}</span></div>
          <div class="feature-row"><span class="label">支持 IDE</span><span>${a.ides.slice(0, 3).join("、")}${a.ides.length > 3 ? " 等" : ""}</span></div>
        </div>
      </div>

      <div class="modal-section">
        <h4>优劣势分析</h4>
        <div class="pros-cons">
          <ul class="pros-list">${a.pros.map((p) => `<li>${p}</li>`).join("")}</ul>
          <ul class="cons-list">${a.cons.map((c) => `<li>${c}</li>`).join("")}</ul>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-outline" onclick="closeModal()">关闭</button>
      <a href="${a.website}" target="_blank" rel="noopener" class="btn btn-primary">访问官网 →</a>
    </div>`;

  modalOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

window.closeModal = closeModal;

// ─── View toggle ──────────────────────────────────────────────────────────────
function setView(view) {
  currentView = view;
  if (view === "grid") {
    gridView.style.display = "block";
    compareView.style.display = "none";
    viewBtnGrid.classList.add("active");
    viewBtnCompare.classList.remove("active");
  } else {
    if (selectedForCompare.length < 2) {
      showToast("请先勾选至少 2 个 Agent 的「加入对比」再切换到对比视图", "error");
      return;
    }
    gridView.style.display = "none";
    compareView.style.display = "block";
    viewBtnGrid.classList.remove("active");
    viewBtnCompare.classList.add("active");
    renderCompareTable();
  }
}

// ─── Events ───────────────────────────────────────────────────────────────────
function setupEvents() {
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim();
    renderAgents();
  });

  viewBtnGrid.addEventListener("click", () => setView("grid"));
  viewBtnCompare.addEventListener("click", () => setView("compare"));

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("open")) closeModal();
  });
}

// ─── Boot ─────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", init);
