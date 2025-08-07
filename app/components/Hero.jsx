import Router from "next/router";
import styles from "../styles/Hero.module.css";
import {
  Flower,
  Volume2,
  VolumeOff,
  X,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { useState, useRef, useLayoutEffect } from "react";
import { selectMeditation, sideBarAnimation } from "../helpers";
import gsap from "gsap";
import Dropdown from "./Dropdown";

const Feeling = ({ emotion }) => {
  if (!emotion) return null;
  const { title, description, meditations } = selectMeditation(emotion);
  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div style={{ position: "absolute", top: "0", left: "0" }}>
      </div>
      <div className={styles.feeling}>
        <h3 className={styles.feelingTitle}>{title}</h3>
        <div className={styles.feeling__image}></div>
        <p className={styles.feelingDescription}>{description}</p>
        <div className={styles.btn__wrapper}>
          <button className={styles.btn__save}>End Session</button>
        </div>
      </div>
      <h3></h3>
    </div>
  );
};

export default function Hero() {
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
      <nav className={styles.nav}>
        <h1 className={styles.logo}>Serenai</h1>
        <button className={styles.cta}>Menu</button>
        <Flower className={styles.icon} />
      </nav>

      <div className={styles.content}>
        <div className={styles.content__wrapper}>
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
        <div className={styles.sound__wrapper}>
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
                <div >
                  <Dropdown ref={dropdownRef} />
                </div>
                {/* <select
                  name="dropdown"
                  className={styles.feeling__dropdown}
                  onChange={(e) => setFeeling(e.target.value)}
                  defaultValue=""
                  
                >
                  <option value="" disabled>
                    Pick an emotion
                  </option>
                  <option value="anxiety">Anxiety</option>
                  <option value="stress">Stress</option>
                  <option value="sadness">Sadness</option>
                  <option value="tired">Tired</option>
                  <option value="angry">Angry</option>
                  <option value="calm">Calm</option>
                  <option value="grateful">Grateful</option>
                  <option value="happy">Happy</option>
                </select> */}
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
              <a href="" className={styles.share__link}>
                Share
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
