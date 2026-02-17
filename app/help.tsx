import { View, StyleSheet, Text, Alert, ScrollView, Platform } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';
import * as Haptics from 'expo-haptics';
import { MaterialIcons, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/assets/constants/Colors';
import { getShadow } from '@/assets/utils/shadow';
import { useRouter } from 'expo-router';

export default function Page() {
  const router = useRouter();

  const handleDeleteAll = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert("Delete All Data", "Are you sure you want to delete ALL links and tags? This cannot be undone.", [
      { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
      {
        text: "Delete Everything", style: "destructive", onPress: () => {
          try {
            const db = SQLite.openDatabaseSync('links.db');
            db.execSync('DELETE FROM links');
            db.execSync('DELETE FROM tags');
            db.execSync('DELETE FROM sqlite_sequence WHERE name="links"');
            db.execSync('DELETE FROM sqlite_sequence WHERE name="tags"');
            db.closeSync();
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            router.replace("/");
          } catch (e) {
            console.log(e);
          }
        }
      },
    ]);
  }

  const HelpCard = ({ icon, title, children }: { icon: any, title: string, children: any }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        {icon}
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <View style={styles.cardContent}>
        {children}
      </View>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#25292e' }}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

        <View style={styles.headerContainer}>
          <Text style={styles.heading}>How to use LinkNest</Text>
          <Text style={styles.subHeading}>Your playful guide to organizing the web.</Text>
        </View>

        <HelpCard
          icon={<MaterialIcons name="add-circle-outline" size={24} color={Colors.tint} />}
          title="Save a Link"
        >
          <Text style={styles.text}>
            • Tap the <Text style={styles.bold}>+</Text> button on the home screen.{'\n'}
            • Paste your URL and give it a valid <Text style={styles.bold}>Tag</Text> (like "Music", "Tech").{'\n'}
            • Add an optional description to remember why you saved it!
          </Text>
        </HelpCard>

        <HelpCard
          icon={<FontAwesome5 name="hand-pointer" size={20} color={Colors.tint} />}
          title="Gestures & Actions"
        >
          <View style={styles.row}>
            <Text style={styles.label}>Single Tap</Text>
            <Text style={styles.value}>Copy link to clipboard 📋</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Double Tap</Text>
            <Text style={styles.value}>Open link in browser 🌐</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Long Press</Text>
            <Text style={styles.value}>Edit link details ✏️</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Swipe Left</Text>
            <Text style={styles.value}>Share link 📤</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Swipe Right</Text>
            <Text style={styles.value}>Delete link 🗑️</Text>
          </View>
        </HelpCard>

        <HelpCard
          icon={<Ionicons name="search" size={22} color={Colors.tint} />}
          title="Search & Explore"
        >
          <Text style={styles.text}>
            • Use the top <Text style={styles.bold}>Search Bar</Text> to filter your saved links by their tag.{'\n'}
            • Tap a <Text style={styles.bold}>Tile</Text> on the dashboard to see all links in that category.
          </Text>
        </HelpCard>

        <HelpCard
          icon={<MaterialCommunityIcons name="database" size={22} color={Colors.tint} />}
          title="Data Storage"
        >
          <Text style={styles.text}>
            • All data is stored <Text style={styles.bold}>locally</Text> on your device.{'\n'}
            • If you <Text style={styles.bold}>clear app data</Text> or <Text style={styles.bold}>uninstall</Text>, your saved links will be lost forever.
          </Text>
        </HelpCard>

        <View style={styles.dangerZone}>
          <Text style={styles.dangerText}>Danger Zone</Text>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAll}>
            <MaterialCommunityIcons name="nuke" size={20} color="white" />
            <Text style={styles.deleteButtonText}>Reset All Data</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>🌟 Stay curious. Stay organized. 🌟</Text>

      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 25,
    alignItems: 'center',
  },
  heading: {
    color: '#fff',
    fontSize: 28,
    fontFamily: "winkyRough",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  subHeading: {
    color: '#aaa',
    fontSize: 14,
    fontFamily: "winkyRough",
    textAlign: "center",
  },
  card: {
    backgroundColor: '#333',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#444',
    ...getShadow("#000", 0.3, 4, 3, { width: 0, height: 2 }),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingBottom: 8,
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: "winkyRough",
    marginLeft: 10,
    fontWeight: "600",
  },
  cardContent: {
    gap: 8,
  },
  text: {
    color: '#ddd',
    fontSize: 15,
    fontFamily: "winkyRough",
    lineHeight: 22,
  },
  bold: {
    color: 'white',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  label: {
    color: Colors.tint,
    fontSize: 15,
    fontFamily: "winkyRough",
    fontWeight: 'bold',
  },
  value: {
    color: '#ddd',
    fontSize: 14,
    fontFamily: "winkyRough",
  },
  dangerZone: {
    marginTop: 20,
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#522',
    borderRadius: 12,
    backgroundColor: '#3a1a1a',
  },
  dangerText: {
    color: '#ff6b6b',
    fontSize: 14,
    fontFamily: "winkyRough",
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    gap: 8,
    ...getShadow("#e74c3c", 0.4, 6, 4, { width: 0, height: 2 }),
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: "winkyRough",
  },
  footer: {
    textAlign: 'center',
    color: '#666',
    marginTop: 30,
    fontSize: 12,
    fontFamily: "winkyRough",
  },
});