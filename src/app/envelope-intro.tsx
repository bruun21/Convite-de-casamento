'use client';

import { useLayoutEffect, useState } from 'react';
import styles from './envelope-intro.module.css';

export function EnvelopeIntro() {
  const [state, setState] = useState<{
    isOpen: boolean;
    isAnimating: boolean;
    prefersReducedMotion: boolean;
  } | null>(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasOpened = localStorage.getItem('envelope-opened') === 'true';

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({
      isOpen: !prefersReduced && !hasOpened,
      isAnimating: false,
      prefersReducedMotion: prefersReduced,
    });
  }, []);

  const handleOpen = () => {
    if (!state || state.isAnimating) return;
    setState({ ...state, isAnimating: true });

    setTimeout(() => {
      localStorage.setItem('envelope-opened', 'true');
      setState({ ...state, isOpen: false });
    }, 3400);
  };

  if (!state) {
    return null;
  }

  if (!state.isOpen) {
    return null;
  }

  return (
    <div
      className={styles.overlay}
      role="presentation"
      aria-hidden="true"
      suppressHydrationWarning
    >
      <div className={styles.container}>
        <button
          className={styles.button}
          onClick={handleOpen}
          aria-label="Abrir convite"
          disabled={state.isAnimating}
        >
          <div className={`${styles.envelope} ${state.isAnimating ? styles.animating : ''}`}>
            <div className={styles.envelopeBody}>
              <p className={styles.names}>Adriele & João Paulo</p>
            </div>

            <div className={styles.envelopeFold} />

            <div className={styles.seal}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt=""
                width={60}
                height={60}
                className={styles.sealLogo}
              />
            </div>
          </div>

          <p className={styles.hint}>Toque para abrir</p>
        </button>
      </div>
    </div>
  );
}
