import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const TOKEN = "47a007212c91cd9ac593f724c11b89a2";
const SUFFIX = "6095";

function log(step, ok, detail = "") {
  const mark = ok ? "OK" : "FAIL";
  console.log(`[${mark}] ${step}${detail ? ` — ${detail}` : ""}`);
}

const browser = await chromium.launch({
  headless: true,
  channel: "chrome",
});
const context = await browser.newContext();
const page = await context.newPage();

let failed = false;

try {
  // Fresh session: no invite cookie
  await context.clearCookies();

  await page.goto(`${BASE}/convite/${TOKEN}`, { waitUntil: "domcontentloaded" });

  const phoneTitle = page.getByRole("heading", { name: "Quase lá" });
  await phoneTitle.waitFor({ state: "visible", timeout: 15000 });
  const hasPhoneGate = await phoneTitle.isVisible();
  log("Tela dos 4 dígitos aparece no link do convite", hasPhoneGate);
  failed ||= !hasPhoneGate;

  const envelopeBefore = page.getByText("Toque para abrir");
  const envelopeVisibleBefore = await envelopeBefore.isVisible().catch(() => false);
  log(
    "Envelope NÃO bloqueia antes do telefone",
    !envelopeVisibleBefore,
    envelopeVisibleBefore ? "envelope visível" : "sem envelope"
  );
  failed ||= envelopeVisibleBefore;

  for (let i = 0; i < 4; i += 1) {
    await page.getByLabel(`Dígito ${i + 1}`).fill(SUFFIX[i]);
  }

  const verifyResponse = page.waitForResponse(
    (response) =>
      response.url().includes("/api/convite/verificar") && response.request().method() === "POST"
  );

  await page.getByRole("button", { name: "Abrir meu convite" }).click();

  const apiResult = await verifyResponse;
  const apiBody = await apiResult.json().catch(() => ({}));
  log("API verificar retorna sucesso", apiResult.ok() && apiBody.success === true, `status ${apiResult.status()}`);
  failed ||= !apiResult.ok() || apiBody.success !== true;

  await page.getByRole("heading", { name: "Quase lá" }).waitFor({ state: "hidden", timeout: 10000 }).catch(() => {});

  const envelopeAfter = await page.getByText("Toque para abrir").isVisible().catch(() => false);
  log(
    "Envelope aparece após validar telefone",
    envelopeAfter,
    envelopeAfter ? "visível" : "não encontrado"
  );
  failed ||= !envelopeAfter;

  const personalizedEnvelope = await page.getByText("Adriele", { exact: true }).first().isVisible().catch(() => false);
  log(
    "Envelope mostra o nome do convidado",
    personalizedEnvelope,
    personalizedEnvelope ? "Adriele" : "nome não encontrado"
  );
  failed ||= !personalizedEnvelope;

  if (envelopeAfter) {
    const openInvite = page.locator('button[aria-label="Abrir convite"]');
    await openInvite.waitFor({ state: "visible", timeout: 5000 });
    await openInvite.click({ force: true });
    await page.waitForTimeout(4200);
  }

  const greeting = page.getByRole("heading", { level: 1 });
  await greeting.waitFor({ state: "visible", timeout: 5000 });
  const greetingText = (await greeting.textContent())?.trim() ?? "";
  const hasPersonalizedName =
    greetingText.length > 0 &&
    !greetingText.includes("Quase lá") &&
    !greetingText.includes("Encontre seu convite");
  log("Convite personalizado com nome", hasPersonalizedName, greetingText);
  failed ||= !hasPersonalizedName;

  const fullSite = await page.getByRole("heading", { name: "Um encontro de almas" }).isVisible().catch(() => false);
  log("Site completo com informações do casamento", fullSite);
  failed ||= !fullSite;

  // Home route
  await context.clearCookies();
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  await page.getByRole("heading", { name: "Acesse seu convite" }).waitFor({ state: "visible" });

  const accessTitle = await page.getByRole("heading", { name: "Acesse seu convite" }).isVisible();
  log("Rota / mostra entrada por telefone", accessTitle);
  failed ||= !accessTitle;

  const homeEnvelope = page.getByText("Toque para abrir");
  const homeHasEnvelope = await homeEnvelope.isVisible().catch(() => false);
  log(
    "Rota / sem envelope antes do telefone",
    !homeHasEnvelope,
    homeHasEnvelope ? "envelope visível" : "sem envelope"
  );
  failed ||= homeHasEnvelope;
} catch (error) {
  failed = true;
  console.error("[FAIL] Erro durante o teste:", error);
} finally {
  await browser.close();
}

if (failed) {
  process.exit(1);
}

console.log("\nTodos os passos do fluxo passaram no Chrome (Playwright).");
