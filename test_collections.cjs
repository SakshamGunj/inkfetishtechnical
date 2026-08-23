import('firebase/app').then(({ initializeApp }) => {
  const firebaseConfig = {
      apiKey: "AIzaSyAemsLgS3vxCkBeQwUKtylkz1N544moBwg",
      authDomain: "inkfetishofficial.firebaseapp.com",
      projectId: "inkfetishofficial",
    };
    initializeApp(firebaseConfig);
});
// Cannot easily list collections with client SDK. 
// I'll check the source code for other collection names.
