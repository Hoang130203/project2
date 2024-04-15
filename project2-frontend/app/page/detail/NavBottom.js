'use client'
import { useEffect, useState } from "react";
import styles from './detailfilm.module.css'
import { AnimatePresence, motion } from "framer-motion";
import Character from "./Characters";
import Overview from "./Overview";
function NavBottom({ data }) {
    const tabs = [
        {
            name: "Tổng quan",
            label: "Tổng quan",
        },
        {
            name: "Nhân vật",
            label: "Nhân vật",
        }
    ];

    const [activeTab, setActiveTab] = useState(tabs[0]);

    const handleClick = (e, tab) => {
        e.preventDefault();

        setActiveTab(tab);
    };

    const isSelected = (tab) => activeTab.name === tab.name;
    useEffect(() => {
    }, [data])
    return (
        <div>
            <div className={styles.detailstabs}>
                <div className={styles.tabHeader}>
                    {tabs.map((tab) => (
                        <div
                            key={tab.name}
                            className={[
                                styles.tabItem,
                                isSelected(tab) ? styles.selected : "",
                            ].join(" ")}
                        >
                            <div className="text-lg" key={tab.name} onClick={(e) => handleClick(e, tab)}>
                                {tab.label}
                            </div>
                            {isSelected(tab) && (
                                <motion.div layoutId="indicator" className={styles.indicator} />
                            )}
                        </div>
                    ))}
                </div>
                <AnimatePresence mode="wait" >
                    <motion.div
                        key={activeTab.name || "empty"}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                        transition={{
                            duration: 0.3,
                        }}
                    >

                        {activeTab && activeTab.name === "Tổng quan" &&
                            <Overview data={data}></Overview>
                        }
                        {activeTab.name === "Nhân vật" && (
                            <div className={styles.characters}>
                                <h3 className={styles.relationsheading}>Nhân vật trong {data.name}</h3>
                                <Character data={data?.characters} />
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default NavBottom;