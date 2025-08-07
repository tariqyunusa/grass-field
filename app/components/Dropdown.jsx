import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import styles from "../styles/Dropdown.module.css";
import { useState } from "react";

const Dropdown = () => {
  const [openDropDown, setOpenDropdown] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  const emotions = [
    "anxiety",
    "stress",
    "sadness",
    "tired",
    "angry",
    "calm",
    "grateful",
    "happy",
  ];

  return (
    <div className={styles.dropdown}>
      <div
        className={styles.dropdown_default}
        onClick={() => setOpenDropdown((prev) => !prev)}
      >
        <span className={styles.dropdown__default_span}>
          <p className={styles.dropdown__default_header}>
            {selectedEmotion ? selectedEmotion.toUpperCase() : "Pick a Feeling"}
          </p>
          <ChevronDown className={styles.dropdown__chevron_down} />
        </span>
      </div>

      <AnimatePresence>
        {openDropDown && (
          <motion.div
            className={styles.dropdown__options}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {emotions.map((feeling, idx) => (
              <motion.div
                key={idx}
                className={styles.feeling__option_wrapper}
                onClick={() => {
                  setSelectedEmotion(feeling);
                  setOpenDropdown(false);
                }}
                initial={false} 
                animate={{ backgroundColor: "transparent" }} 
                whileHover={{ backgroundColor: "#ffffff" }}
                transition={{ duration: 0.5,  ease: [0.25, 0.25, 0.75, 0.75]}}
              >
                <p className={styles.feeling__option}>{feeling}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
