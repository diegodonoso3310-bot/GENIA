export const renderShell = (content) => `
  <div class="app-shell">
    <aside class="sidebar panel">
      <div>
        <span class="brand-mark">GENIA</span>
        <p class="sidebar-copy">Control center</p>
      </div>
      <nav>
        <a class="nav-item nav-item--active" href="#dashboard">Dashboard</a>
        <a class="nav-item" href="#agents">Agents</a>
        <a class="nav-item" href="#configuration">Configuration</a>
        <a class="nav-item" href="#escalations">Escalations</a>
        <a class="nav-item" href="#integrations">Integrations</a>
      </nav>
      <div class="sidebar-footer soft-panel">
        <span class="meta-label">Workspace</span>
        <strong>Enterprise Operations</strong>
        <p>Updated for Phase 2 planning and stakeholder review.</p>
      </div>
    </aside>
    <main class="content">${content}</main>
  </div>
`
