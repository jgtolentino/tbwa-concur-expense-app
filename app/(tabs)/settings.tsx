import React from "react";
import { StyleSheet, Text, View, Pressable, Switch, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useExpenseStore } from "@/store/expenseStore";
import { colors } from "@/constants/colors";
import {
  Bell,
  HelpCircle,
  Info,
  Lock,
  LogOut,
  Moon,
  Trash2,
} from "lucide-react-native";

type ToggleItem = {
  icon: React.ReactElement;
  label: string;
  type: "toggle";
  value: boolean;
};

type LinkItem = {
  icon: React.ReactElement;
  label: string;
  type: "link";
};

type ButtonItem = {
  icon: React.ReactElement;
  label: string;
  type: "button";
  onPress?: () => void;
  danger?: boolean;
};

type SettingItem = ToggleItem | LinkItem | ButtonItem;

type SettingSection = {
  title: string;
  items: SettingItem[];
};

export default function SettingsScreen() {
  const { expenses } = useExpenseStore();
  
  const clearAllData = () => {
    Alert.alert(
      "Clear All Data",
      "Are you sure you want to delete all your expenses? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            await AsyncStorage.clear();
            Alert.alert("Success", "All data has been cleared. Please restart the app.");
          },
          style: "destructive",
        },
      ]
    );
  };
  
  const settingsOptions: SettingSection[] = [
    {
      title: "Preferences",
      items: [
        {
          icon: <Bell size={20} color={colors.primary} />,
          label: "Notifications",
          type: "toggle",
          value: true,
        },
        {
          icon: <Moon size={20} color={colors.primary} />,
          label: "Dark Mode",
          type: "toggle",
          value: false,
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          icon: <HelpCircle size={20} color={colors.primary} />,
          label: "Help & Support",
          type: "link",
        },
        {
          icon: <Info size={20} color={colors.primary} />,
          label: "About",
          type: "link",
        },
        {
          icon: <Lock size={20} color={colors.primary} />,
          label: "Privacy Policy",
          type: "link",
        },
      ],
    },
    {
      title: "Data",
      items: [
        {
          icon: <Trash2 size={20} color={colors.danger} />,
          label: "Clear All Data",
          type: "button",
          onPress: clearAllData,
          danger: true,
        },
        {
          icon: <LogOut size={20} color={colors.danger} />,
          label: "Sign Out",
          type: "button",
          danger: true,
        },
      ],
    },
  ];
  
  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileInitial}>J</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>john.doe@example.com</Text>
        </View>
      </View>
      
      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{expenses.length}</Text>
          <Text style={styles.statLabel}>Expenses</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            ${useExpenseStore.getState().getTotalExpenses().toFixed(2)}
          </Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>
      
      {settingsOptions.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionContent}>
            {section.items.map((item, itemIndex) => (
              <Pressable
                key={itemIndex}
                style={styles.settingItem}
                onPress={item.type === "button" ? item.onPress : undefined}
              >
                <View style={styles.settingLeft}>
                  {item.icon}
                  <Text
                    style={[
                      styles.settingLabel,
                      item.type === "button" && item.danger && styles.dangerText,
                    ]}
                  >
                    {item.label}
                  </Text>
                </View>
                
                {item.type === "toggle" && (
                  <Switch
                    value={item.value}
                    onValueChange={() => {}}
                    trackColor={{
                      false: colors.gray[300],
                      true: colors.primary,
                    }}
                    thumbColor={colors.card}
                  />
                )}
                
                {item.type === "link" && (
                  <Text style={styles.settingValue}>{">"}</Text>
                )}
              </Pressable>
            ))}
          </View>
        </View>
      ))}
      
      <Text style={styles.versionText}>Version 1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  profileInitial: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statsSection: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textSecondary,
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionContent: {
    backgroundColor: colors.card,
    borderRadius: 12,
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingLabel: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  settingValue: {
    fontSize: 16,
    color: colors.gray[500],
  },
  dangerText: {
    color: colors.danger,
  },
  versionText: {
    textAlign: "center",
    fontSize: 14,
    color: colors.gray[500],
    marginTop: 16,
  },
});