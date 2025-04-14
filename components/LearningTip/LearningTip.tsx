import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { styles, THEME_COLORS } from "./styles"
import React, { PropsWithChildren } from "react";

type LearningTipProps = PropsWithChildren<{
  icon?: string
}>

const LearningTip = ({ children, icon = "💡" }: LearningTipProps) => {
  return (
    <ThemedView
      style={styles.container}
      lightColor={THEME_COLORS.light.background}
      darkColor={THEME_COLORS.dark.background}
    >
      <ThemedText
        type="default"
        style={styles.text}
        lightColor={THEME_COLORS.light.text}
        darkColor={THEME_COLORS.dark.text}
      >
        {icon}{children}
      </ThemedText>
    </ThemedView>
  );
};

export default LearningTip;
