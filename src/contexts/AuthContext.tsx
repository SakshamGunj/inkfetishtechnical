import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface AuthContextType {
    user: User | null;
    authorUsername: string | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    authorUsername: null,
    loading: true,
    signOut: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [authorUsername, setAuthorUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                // Look up their username from Firestore to know their public URL
                try {
                    const docRef = doc(db, 'author_portfolios', currentUser.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists() && docSnap.data().username) {
                        setAuthorUsername(docSnap.data().username);
                    } else {
                        setAuthorUsername(null);
                    }
                } catch (error) {
                    console.error("Error fetching author profile mapping:", error);
                    setAuthorUsername(null);
                }
            } else {
                setAuthorUsername(null);
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signOut = async () => {
        await firebaseSignOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, authorUsername, loading, signOut }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
