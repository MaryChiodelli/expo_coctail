import { ThemeContext } from '@/context/ThemeContext';
import React, { useContext, useState } from 'react';
import {
    Alert,
    FlatList,
    Modal,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface SettingsState {
  notifications: boolean;
  pushNotifications: boolean;
  emailUpdates: boolean;
  autoRefresh: boolean;
  language: string;
  region: string;
  cacheSize: string;
  privacyMode: boolean;
  analyticsEnabled: boolean;
}

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  selectedValue: string;
  options: DropdownOption[];
  onValueChange: (value: string) => void;
  colors: any;
}

const CustomDropdown: React.FC<DropdownProps> = ({ selectedValue, options, onValueChange, colors }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const selectedOption = options.find(option => option.value === selectedValue);
  
  return (
    <>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 8,
          padding: 12,
          backgroundColor: colors.background,
          marginTop: 8,
        }}
        onPress={() => setIsVisible(true)}
      >
        <Text style={{ color: colors.text, fontSize: 16 }}>
          {selectedOption?.label || 'Select option'}
        </Text>
      </TouchableOpacity>
      
      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 12,
              padding: 20,
              width: '80%',
              maxHeight: '60%',
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: colors.text,
                marginBottom: 16,
                textAlign: 'center',
              }}
            >
              Select Option
            </Text>
            
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                  }}
                  onPress={() => {
                    onValueChange(item.value);
                    setIsVisible(false);
                  }}
                >
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 16,
                      fontWeight: selectedValue === item.value ? 'bold' : 'normal',
                    }}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
            
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                padding: 12,
                borderRadius: 8,
                marginTop: 16,
              }}
              onPress={() => setIsVisible(false)}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: '600',
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default function SettingsScreen() {
  const { theme, colors, toggleTheme } = useContext(ThemeContext);
  
  const [settings, setSettings] = useState<SettingsState>({
    notifications: true,
    pushNotifications: false,
    emailUpdates: true,
    autoRefresh: false,
    language: 'en',
    region: 'us',
    cacheSize: 'medium',
    privacyMode: false,
    analyticsEnabled: true,
  });

  const languageOptions: DropdownOption[] = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Italian', value: 'it' },
  ];

  const regionOptions: DropdownOption[] = [
    { label: 'United States', value: 'us' },
    { label: 'Europe', value: 'eu' },
    { label: 'Asia Pacific', value: 'ap' },
    { label: 'Canada', value: 'ca' },
    { label: 'Latin America', value: 'la' },
  ];

  const cacheSizeOptions: DropdownOption[] = [
    { label: 'Small (50MB)', value: 'small' },
    { label: 'Medium (100MB)', value: 'medium' },
    { label: 'Large (200MB)', value: 'large' },
    { label: 'Unlimited', value: 'unlimited' },
  ];

  const updateSetting = (key: keyof SettingsState, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    Alert.alert('Settings Saved', 'Your preferences have been saved successfully!');
  };

  const handleResetSettings = () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings to default?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setSettings({
              notifications: true,
              pushNotifications: false,
              emailUpdates: true,
              autoRefresh: false,
              language: 'en',
              region: 'us',
              cacheSize: 'medium',
              privacyMode: false,
              analyticsEnabled: true,
            });
          },
        },
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContainer: {
      padding: 20,
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 30,
      textAlign: 'center',
    },
    section: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 16,
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    lastSettingItem: {
      borderBottomWidth: 0,
    },
    settingLabel: {
      fontSize: 16,
      color: colors.text,
      flex: 1,
    },
    settingDescription: {
      fontSize: 14,
      color: colors.text,
      opacity: 0.7,
      marginTop: 4,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 30,
      gap: 16,
    },
    button: {
      flex: 1,
      backgroundColor: colors.primary,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonSecondary: {
      backgroundColor: colors.secondary,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: colors.primary,
      borderRadius: 4,
      marginRight: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkboxChecked: {
      backgroundColor: colors.primary,
    },
    checkboxText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: 'bold',
    },
  });

  const CustomCheckbox = ({ value, onValueChange, label }: { value: boolean; onValueChange: (value: boolean) => void; label: string }) => (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => onValueChange(!value)}
    >
      <View style={[styles.checkbox, value && styles.checkboxChecked]}>
        {value && <Text style={styles.checkboxText}>✓</Text>}
      </View>
      <Text style={styles.settingLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Settings</Text>

        {/* Theme Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={[styles.settingItem, styles.lastSettingItem]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Text style={styles.settingDescription}>Toggle between light and dark theme</Text>
            </View>
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={theme === 'dark' ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <View style={styles.settingItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Enable Notifications</Text>
              <Text style={styles.settingDescription}>Receive app notifications</Text>
            </View>
            <Switch
              value={settings.notifications}
              onValueChange={(value) => updateSetting('notifications', value)}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={settings.notifications ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>

          <View style={styles.settingItem}>
            <CustomCheckbox
              value={settings.pushNotifications}
              onValueChange={(value) => updateSetting('pushNotifications', value)}
              label="Push Notifications"
            />
          </View>

          <View style={[styles.settingItem, styles.lastSettingItem]}>
            <CustomCheckbox
              value={settings.emailUpdates}
              onValueChange={(value) => updateSetting('emailUpdates', value)}
              label="Email Updates"
            />
          </View>
        </View>

        {/* General Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          
          <View style={styles.settingItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Auto Refresh</Text>
              <Text style={styles.settingDescription}>Automatically refresh content</Text>
            </View>
            <Switch
              value={settings.autoRefresh}
              onValueChange={(value) => updateSetting('autoRefresh', value)}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={settings.autoRefresh ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Language</Text>
              <CustomDropdown
                selectedValue={settings.language}
                options={languageOptions}
                onValueChange={(value) => updateSetting('language', value)}
                colors={colors}
              />
            </View>
          </View>

          <View style={[styles.settingItem, styles.lastSettingItem]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Region</Text>
              <CustomDropdown
                selectedValue={settings.region}
                options={regionOptions}
                onValueChange={(value) => updateSetting('region', value)}
                colors={colors}
              />
            </View>
          </View>
        </View>

        {/* Performance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance</Text>
          
          <View style={[styles.settingItem, styles.lastSettingItem]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Cache Size</Text>
              <Text style={styles.settingDescription}>Manage app cache storage</Text>
              <CustomDropdown
                selectedValue={settings.cacheSize}
                options={cacheSizeOptions}
                onValueChange={(value) => updateSetting('cacheSize', value)}
                colors={colors}
              />
            </View>
          </View>
        </View>

        {/* Privacy Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          
          <View style={styles.settingItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Privacy Mode</Text>
              <Text style={styles.settingDescription}>Enhanced privacy protection</Text>
            </View>
            <Switch
              value={settings.privacyMode}
              onValueChange={(value) => updateSetting('privacyMode', value)}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={settings.privacyMode ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>

          <View style={[styles.settingItem, styles.lastSettingItem]}>
            <CustomCheckbox
              value={settings.analyticsEnabled}
              onValueChange={(value) => updateSetting('analyticsEnabled', value)}
              label="Analytics & Crash Reports"
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSaveSettings}>
            <Text style={styles.buttonText}>Save Settings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.buttonSecondary]} 
            onPress={handleResetSettings}
          >
            <Text style={styles.buttonText}>Reset to Default</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}