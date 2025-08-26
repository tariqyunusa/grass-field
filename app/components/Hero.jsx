import Router from "next/router";
import styles from "../styles/Hero.module.css";
import {
  Flower,
  Volume2,
  VolumeOff,
  X,
  Copy,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import {
  meditationConfig,
  selectMeditation,
  sideBarAnimation,
} from "../helpers";
import gsap from "gsap";
import Dropdown from "./Dropdown";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const Feeling = ({ emotion }) => {
  if (!emotion) return null;
  const { title, description, meditations } = selectMeditation(emotion);
  const [currentMeditation, setCurrentMeditation] = useState(meditations[0]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const config = meditationConfig[meditations];
  const totalDuration = config?.duration || 180;

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeElapsed((prev) => {
        if (prev < totalDuration) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setIsRunning(false);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, totalDuration]);

  const progress = timeElapsed / totalDuration;

  const startMeditation = () => {
    setTimeElapsed(0);
    setIsRunning(true);
  };

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div style={{ position: "absolute", top: "0", left: "0" }}></div>
      <div className={styles.feeling}>
        <h3 className={styles.feelingTitle}>{title}</h3>

        {/* <div className={styles.feeling__image} onClick={startMeditation}></div> */}
        <div className={styles.progressWrapper} onClick={startMeditation}>
          <svg className={styles.progressCircle} viewBox="0 0 140 140">
            <circle className={styles.progressBg} cx="70" cy="70" r="64" />
            <circle
              className={styles.progress}
              cx="70"
              cy="70"
              r="64"
              style={{
                strokeDasharray: 2 * Math.PI * 64,
                strokeDashoffset:
                  2 * Math.PI * 64 - progress * (2 * Math.PI * 64),
              }}
            />
          </svg>
          <div className={styles.feeling__image}></div>
        </div>

        <p className={styles.feelingDescription}>{description}</p>
        <div className={styles.progress_contatiner}>
          <div
            className={styles.progressBar}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className={styles.btn__wrapper}>
          <button className={styles.btn__save}>End Session</button>
        </div>
      </div>
    </div>
  );
};

export default function Hero({ headerRef, paragraphRef, soundBtnRef }) {
  const [shareOpen, setIsShareOpen] = useState(false);
  const [feeling, setFeeling] = useState();
  const [step, setStep] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openTl = useRef();

  const sidebarRef = useRef(null);
  const closeButtonRef = useRef(null);
  const logoSidebarRef = useRef(null);
  const headlineRef = useRef(null);
  const dropdownRef = useRef(null);
  const nextButtonRef = useRef(null);
  const footerRef = useRef(null);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    if (openTl.current) {
      openTl.current.eventCallback("onReverseComplete", () => {
        setSidebarOpen(false);
        openTl.current = null;
        setStep(0);
      });

      openTl.current.reverse();
    }
  };

  useLayoutEffect(() => {
    sideBarAnimation(
      sidebarRef,
      closeButtonRef,
      dropdownRef,
      nextButtonRef,
      footerRef,
      sidebarOpen,
      openTl,
      logoSidebarRef,
      headlineRef
    );
  }, [sidebarOpen]);

  return (
    <>
      <nav className={styles.nav} ref={headerRef}>
        <h1 className={styles.logo}>Serenai</h1>
        <button className={styles.cta}>Menu</button>
        <Flower className={styles.icon} />
      </nav>

      <div className={styles.content}>
        <div className={styles.content__wrapper} ref={paragraphRef}>
          <h1 className={styles.headline}>Serenai. Where Stillness Begins.</h1>
          <p className={styles.subheadline}>
            Your daily pause — a gentle invitation to breathe, reflect, and
            simply be.
          </p>
          <div>
            <button className={styles.cta__} onClick={openSidebar}>
              Enter
            </button>
          </div>
        </div>
        <div className={styles.sound__wrapper} ref={soundBtnRef}>
          <button className={styles.icon__sound}>
            <Volume2 />
          </button>
        </div>
      </div>

      {sidebarOpen && (
        <div ref={sidebarRef} className={styles.sidebar}>
          <div className={styles.sidebar__header}>
            <button
              ref={closeButtonRef}
              className={styles.sidebar__close}
              onClick={closeSidebar}
            >
              <X />
            </button>
            <div ref={logoSidebarRef} className={styles.logo_sidebar_wrapper}>
              <Flower className={styles.logo__sidebar} />
            </div>
          </div>
          <main className={styles.sidebar__inner_container}>
            <div
              className={styles.sidebar__step_slider}
              style={{ transform: `translateX(-${step * 100}%)` }}
            >
              <div className={styles.sidebar__step}>
                <h2 className={styles.sidebar__inner_header} ref={headlineRef}>
                  How are you feeling today?
                </h2>
                <div ref={dropdownRef}>
                  <Dropdown setFeeling={setFeeling} />
                </div>

                <div className={styles.sidebar_main_cta}>
                  <button
                    className={styles.sidebar__cta}
                    onClick={() => feeling && setStep(1)}
                    ref={nextButtonRef}
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className={styles.sidebar__step}>
                {step === 1 && <Feeling emotion={feeling} />}
              </div>
            </div>
          </main>

          <div className={styles.sidebar__inner_link} ref={footerRef}>
            <AnimatePresence>
              {shareOpen && (
                <motion.div
                  className={styles.share__popup}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <motion.div
                    className={styles.sharee__option}
                    initial={false}
                    animate={{ backgroundColor: "transparent" }}
                    whileHover={{ backgroundColor: "#ffffff" }}
                    transition={{
                      duration: 0.5,
                      ease: [0.25, 0.25, 0.75, 0.75],
                    }}
                  >
                    <Copy /> <p>Copy link</p>
                  </motion.div>
                  <motion.div
                    className={styles.sharee__option}
                    initial={false}
                    animate={{ backgroundColor: "transparent" }}
                    whileHover={{ backgroundColor: "#ffffff" }}
                    transition={{
                      duration: 0.5,
                      ease: [0.25, 0.25, 0.75, 0.75],
                    }}
                  >
                    <div className={styles.share__option_icon}>
                      <Image src="/X.svg" alt="X icon" fill />
                    </div>
                    <p> X</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            <p>
              Built by{" "}
              <a
                href="http://tareeq.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tariq
              </a>
            </p>
            <div className={styles.share__wrapper}>
              <p
                className={styles.share__link}
                onClick={() => setIsShareOpen(!shareOpen)}
              >
                Share
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
