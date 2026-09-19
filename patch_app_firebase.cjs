const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Add imports
const imports = `
import { auth, db, login, logout, handleFirestoreError, OperationType } from './utils/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
`;
content = content.replace(/import \{ Header \} from '.\/components\/Header';/, imports + "\nimport { Header } from './components/Header';");

// Add auth state
content = content.replace(
  /const \[activeTab, setActiveTab\] = useState/,
  "const [currentUser, setCurrentUser] = useState<User | null>(null);\n  const [isSyncing, setIsSyncing] = useState(false);\n  const [activeTab, setActiveTab] = useState"
);

// Add auth effect
const authEffect = `
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch user's tournament state
        setIsSyncing(true);
        try {
          const docRef = doc(db, 'tournaments', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.fixturesJson) setFixtures(JSON.parse(data.fixturesJson));
            if (data.knockoutJson) setKnockoutMatches(JSON.parse(data.knockoutJson));
          } else {
             // Create initial state in cloud
             await setDoc(docRef, {
               ownerId: user.uid,
               fixturesJson: JSON.stringify(fixtures),
               knockoutJson: JSON.stringify(knockoutMatches),
               updatedAt: serverTimestamp()
             });
          }
        } catch (error) {
          console.error("Cloud Sync Error", error);
        }
        setIsSyncing(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Save state to cloud on change
  useEffect(() => {
    if (currentUser && !isSyncing) {
      const saveState = async () => {
        try {
          const docRef = doc(db, 'tournaments', currentUser.uid);
          await setDoc(docRef, {
            ownerId: currentUser.uid,
            fixturesJson: JSON.stringify(fixtures),
            knockoutJson: JSON.stringify(knockoutMatches),
            updatedAt: serverTimestamp()
          }, { merge: true });
        } catch (error) {
           console.error("Cloud Save Error", error);
        }
      };
      
      const timeoutId = setTimeout(() => {
        saveState();
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [fixtures, knockoutMatches, currentUser, isSyncing]);

`;

content = content.replace(/useEffect\(\(\) => \{\n\s*const saved = localStorage\.getItem\('ucl_2026_settings'\);/, authEffect + "\n  useEffect(() => {\n    const saved = localStorage.getItem('ucl_2026_settings');");

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log("Patched App.tsx with Firebase Cloud Sync");
