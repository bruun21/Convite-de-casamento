'use client';

import { Great_Vibes } from 'next/font/google';
import { useLayoutEffect, useState } from 'react';

import { requestScrollReveal } from '@/lib/scroll-reveal-events';

import styles from './envelope-intro.module.css';

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes',
  display: 'swap',
});

const OPENING_DURATION_MS = 3900;

function isLocalhostHost(hostname: string) {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
}

interface EnvelopeIntroProps {
  storageKey?: string;
  recipientName?: string;
}

export function EnvelopeIntro({
  storageKey = 'envelope-opened',
  recipientName,
}: EnvelopeIntroProps) {
  const trimmedName = recipientName?.trim();
  const inviteEyebrow = trimmedName ?? "Convite especial";
  const [state, setState] = useState<{
    isOpen: boolean;
    isAnimating: boolean;
    prefersReducedMotion: boolean;
    isDevHost: boolean;
  } | null>(null);
  const [logoFailed, setLogoFailed] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasOpened = localStorage.getItem(storageKey) === 'true';

    const isOpen = !prefersReduced && !hasOpened;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({
      isOpen,
      isAnimating: false,
      prefersReducedMotion: prefersReduced,
      isDevHost: isLocalhostHost(window.location.hostname),
    });
  }, [storageKey]);

  const handleOpen = () => {
    if (!state || state.isAnimating) return;
    setState({ ...state, isAnimating: true });

    setTimeout(() => {
      localStorage.setItem(storageKey, 'true');
      setState((prev) => (prev ? { ...prev, isOpen: false, isAnimating: false } : prev));
      requestScrollReveal();
    }, OPENING_DURATION_MS);
  };

  const handleReplay = () => {
    if (!state || state.prefersReducedMotion) return;
    localStorage.removeItem(storageKey);
    setLogoFailed(false);
    setReplayKey((k) => k + 1);
    setState({ ...state, isOpen: true, isAnimating: false });
  };

  if (!state) {
    return null;
  }

  if (!state.isOpen) {
    if (!state.isDevHost) return null;

    return (
      <button
        className={styles.btnReplay}
        type="button"
        onClick={handleReplay}
        aria-label="Ver animação do envelope novamente"
      >
        ↻ Ver novamente
      </button>
    );
  }

  const sceneClass = state.isAnimating ? styles.aberto : '';

  return (
    <div
      key={replayKey}
      className={`${styles.overlay} ${greatVibes.variable} ${state.isAnimating ? styles.animating : ''}`}
      role="presentation"
      aria-hidden="true"
      suppressHydrationWarning
    >
      <div className={`${styles.scene} ${sceneClass}`}>
        <button
          className={styles.button}
          onClick={handleOpen}
          aria-label="Abrir convite"
          disabled={state.isAnimating}
        >
          <div className={styles.flutuante}>
            <div className={styles.envelope}>
              {/* Frente */}
              <div className={`${styles.face} ${styles.frente}`}>
                <div className={styles.addrLines}>
                  <div className={styles.addrLine} style={{ width: 52 }} />
                  <div className={styles.addrLine} style={{ width: 36 }} />
                </div>

                <div className={styles.seloPostal} aria-hidden="true">
                  <span className={styles.seloOrnamento}>♡</span>
                  <span className={styles.seloData}>
                    26.06
                    <br />
                    2026
                  </span>
                </div>

                <div className={styles.carimbo} aria-hidden="true">
                  Cuiabá
                  <br />
                  • MT •
                </div>

                <div className={styles.textos}>
                  <p>
                    <span className={styles.label}>De: </span>
                    <span className={styles.nome}>Adriele &amp; João Paulo</span>
                  </p>
                  <span className={styles.separador} />
                  <p>
                    <span className={styles.label}>Para: </span>
                    <span className={styles.nome}>{trimmedName ?? "você"}</span>
                  </p>
                </div>
              </div>

              {/* Verso */}
              <div className={`${styles.face} ${styles.verso}`}>
                <svg
                  className={styles.versoAbas}
                  viewBox="0 0 380 240"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <polygon points="0,240 380,240 190,130" fill="#e9d8b8" opacity="0.85" />
                  <polygon points="0,0 0,240 190,130" fill="#e0cda6" opacity="0.7" />
                  <polygon points="380,0 380,240 190,130" fill="#eddcbe" opacity="0.75" />
                </svg>

                <div className={styles.abaSuperior} aria-hidden="true" />

                <div
                  className={`${styles.lacre} ${logoFailed ? styles.semLogo : ''}`}
                  aria-hidden="true"
                >
                  <div className={styles.lacreBlob}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/logo.svg"
                      alt=""
                      width={60}
                      height={60}
                      className={styles.lacreLogo}
                      onError={() => setLogoFailed(true)}
                    />
                    <span className={styles.lacreMonograma}>A&amp;J</span>
                  </div>
                  <div className={styles.frag} style={{ top: '20%', left: '70%' }} />
                  <div className={styles.frag} style={{ top: '60%', left: '15%' }} />
                  <div className={styles.frag} style={{ top: '10%', left: '40%' }} />
                </div>

                <div className={styles.carta} aria-hidden="true">
                  <div className={styles.cartaConteudo}>
                    <p className={styles.cartaEyebrow}>{inviteEyebrow}</p>
                    <h2 className={styles.cartaTitulo}>Adriele &amp; João Paulo</h2>
                    <p className={styles.cartaSubtitulo}>26 de junho de 2026 — Cuiabá, MT</p>
                    <div className={styles.cartaDeco} />
                    <p className={styles.cartaTexto}>
                      Convidamos você para testemunhar o momento em que nossas vidas se tornam uma
                      só jornada.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.hintGroup} aria-hidden="true">
            <p className={styles.hintEyebrow}>A &amp; J</p>
            <p className={styles.hint}>Toque para abrir</p>
          </div>
        </button>
      </div>
    </div>
  );
}
