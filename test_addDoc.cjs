import('firebase/app').then(({ initializeApp }) => {
  import('firebase/firestore').then(({ getFirestore, collection, addDoc }) => {
    const firebaseConfig = {
      apiKey: "AIzaSyAemsLgS3vxCkBeQwUKtylkz1N544moBwg",
      authDomain: "inkfetishofficial.firebaseapp.com",
      projectId: "inkfetishofficial",
    };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    addDoc(collection(db, 'test'), { test: 1 }).then(doc => {
      console.log('Added doc ID:', doc.id, 'Length:', doc.id.length);
      process.exit(0);
    });
  });
});
