import {
  dashboardStats,
  agentCards,
  escalationPolicies,
  integrationGroups,
  agentProfiles,
} from './data.js'
import { renderShell } from './layout/AppShell.js'

const healthTone = {
  healthy: 'success',
  warning: 'warning',
  draft: 'neutral',
}

const renderMetricCard = (stat) => `
  <article class="metric-card soft-panel">
    <span class="metric-label">${stat.label}</span>
    <strong>${stat.value}</strong>
    <span class="badge badge--${stat.tone}">${stat.delta}</span>
  </article>
`

const renderAgentHealthCard = (agent) => `
  <div class="timeline-item">
    <div>
      <div class="title-row">
        <h3>${agent.name}</h3>
        <span class="badge badge--${healthTone[agent.status]}">${agent.status}</span>
      </div>
      <p>${agent.summary}</p>
    </div>
    <dl class="inline-stats">
      <div>
        <dt>CSAT</dt>
        <dd>${agent.csat}</dd>
      </div>
      <div>
        <dt>Auto-resolved</dt>
        <dd>${agent.resolutionRate}</dd>
      </div>
      <div>
        <dt>Escalations</dt>
        <dd>${agent.escalations}</dd>
      </div>
    </dl>
  </div>
`

const renderAgentProfile = (profile) => `
  <article class="soft-panel agent-profile-card">
    <div class="agent-profile-header">
      <div>
        <h3>${profile.name}</h3>
        <p>${profile.owner}</p>
      </div>
      <span class="badge badge--${profile.live ? 'success' : 'neutral'}">${profile.live ? 'Live' : 'Draft'}</span>
    </div>
    <p>${profile.description}</p>
    <ul class="token-list">
      ${profile.channels.map((channel) => `<li>${channel}</li>`).join('')}
    </ul>
  </article>
`

const renderEscalationPolicy = (policy) => `
  <article class="policy-row">
    <div>
      <h3>${policy.name}</h3>
      <p>${policy.trigger}</p>
    </div>
    <div>
      <span class="meta-label">Route to</span>
      <strong>${policy.destination}</strong>
    </div>
    <div>
      <span class="meta-label">SLA</span>
      <strong>${policy.sla}</strong>
    </div>
  </article>
`

const renderIntegrationCard = (group) => `
  <article class="soft-panel integration-card">
    <div class="title-row">
      <h3>${group.name}</h3>
      <span class="badge badge--${group.statusTone}">${group.status}</span>
    </div>
    <p>${group.description}</p>
    <ul class="detail-list">
      ${group.items
        .map(
          (item) => `
            <li>
              <span>${item.name}</span>
              <span>${item.scope}</span>
            </li>
          `,
        )
        .join('')}
    </ul>
  </article>
`

export const renderApp = () =>
  renderShell(`
    <section id="dashboard" class="hero panel">
      <div>
        <span class="eyebrow">Phase 2 rollout</span>
        <h1>Operations control center for high-trust agent delivery</h1>
        <p class="hero-copy">
          Monitor throughput, tune agent behavior, review escalation coverage,
          and manage connected systems from a single workspace.
        </p>
      </div>
      <div class="hero-metrics-grid">
        ${dashboardStats.map(renderMetricCard).join('')}
      </div>
    </section>

    <section class="section-grid">
      <div class="panel section-card">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Dashboard</span>
            <h2>Program health snapshot</h2>
          </div>
          <button class="ghost-button">Export weekly digest</button>
        </div>
        <div class="timeline-list">
          ${agentCards.map(renderAgentHealthCard).join('')}
        </div>
      </div>

      <div id="agents" class="panel section-card">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Agents module</span>
            <h2>Agent directory</h2>
          </div>
          <button class="primary-button">Create agent</button>
        </div>
        <div class="agent-list">
          ${agentProfiles.map(renderAgentProfile).join('')}
        </div>
      </div>
    </section>

    <section class="section-grid section-grid--detail">
      <div id="configuration" class="panel section-card">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Agent configuration</span>
            <h2>Behavior settings</h2>
          </div>
          <button class="ghost-button">Duplicate config</button>
        </div>
        <div class="config-layout">
          <div class="config-column soft-panel">
            <h3>Response policy</h3>
            <div class="field-list">
              <label>
                Tone
                <select>
                  <option selected>Concise and reassuring</option>
                  <option>Detailed and consultative</option>
                  <option>High-empathy handoff</option>
                </select>
              </label>
              <label>
                Knowledge scope
                <select>
                  <option selected>Workspace + approved integrations</option>
                  <option>Public docs only</option>
                  <option>Workspace only</option>
                </select>
              </label>
              <label>
                Approval threshold
                <input value="Escalate actions above medium risk" />
              </label>
            </div>
          </div>
          <div class="config-column soft-panel">
            <h3>Guardrails</h3>
            <div class="switch-list">
              <div>
                <span>Require customer verification</span>
                <button class="toggle is-on">On</button>
              </div>
              <div>
                <span>Allow proactive follow-ups</span>
                <button class="toggle is-on">On</button>
              </div>
              <div>
                <span>Enable billing actions</span>
                <button class="toggle">Off</button>
              </div>
            </div>
            <div class="callout-box">
              <strong>Recommendation</strong>
              <p>
                Keep billing changes disabled until integration scopes are
                verified in production.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="escalations" class="panel section-card">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Escalation rules</span>
            <h2>Human-in-the-loop coverage</h2>
          </div>
          <button class="ghost-button">Edit routing matrix</button>
        </div>
        <div class="policy-table">
          ${escalationPolicies.map(renderEscalationPolicy).join('')}
        </div>
      </div>
    </section>

    <section id="integrations" class="panel section-card">
      <div class="section-heading">
        <div>
          <span class="eyebrow">Integrations settings UI</span>
          <h2>Connected systems and access scopes</h2>
        </div>
        <button class="primary-button">Add integration</button>
      </div>
      <div class="integration-grid">
        ${integrationGroups.map(renderIntegrationCard).join('')}
      </div>
    </section>
  `)
