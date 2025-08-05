import styles from "../styles/Hero.module.css";
import { Flower, Volume2, VolumeOff, X } from "lucide-react";
export default function Hero() {
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
            <button className={styles.cta__}>Enter</button>
          </div>
        </div>
        <div className={styles.sound__wrapper}>
          <button className={styles.icon__sound}>
            <Volume2 />
          </button>
        </div>
      </div>
      <div className={styles.sidebar}>
       <div className={styles.sidebar__header}>
         <button className={styles.sidebar__close}>
          <X />
        </button>
        <div className={styles.logo_sidebar_wrapper}>
            <Flower className={styles.logo__sidebar} />
        </div>
       </div>
        <main className={styles.sidebar__inner_container}>
          <h2 className={styles.sidebar__inner_header}>How are you feeling today?</h2>
          <div>
            <select
            name="dropdown"
            className={styles.feeling__dropdown}
          >
            <option value="" disabled >
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
          </select>
          </div>
          <div className={styles.sidebar_main_cta}><button className={styles.sidebar__cta}>Next</button></div>
          
        </main>
        <div className={styles.sidebar__inner_link}>
            <p>Built by <a href="http://tareeq.vercel.app" target="_blank" rel="noopener noreferrer">Tariq Yunusa</a></p>
          </div>
      </div>
    </>
  );
}
