comando per buildare l'apk
eas build -p android --profile preview

comandi per aggiornamenti:
-informazioni per l'update 
eas update -h

aggiungere -h dopo ogni pezzo di comando suggerisce come continuare il comando

-lancio dell'update
eas update --channel preview --platform android --message "Sending OTA"

OTA = Over-The-Air

Comandi di reset & reinstallazione
rd /s /q node_modules
del /f /q package-lock.json
npm cache clean --force
npm install
npx expo start --clear

installa i pacchetti con versioni compatibili
npm install --legacy-peer-deps

cancellare directory android
rmdir /s /q android

crere directory pulite android ios
npx expo prebuild --clean 

per l'integrazione di firebase:
-nel file build.gradle con path android/app/buld.gradle aggiungere
apply plugin: 'com.google.gms.google-services' 
-nel file build.gradle con path android/build.gradlea aggiungere
 classpath ('com.google.gms:google-services:4.4.2')
 -il file google-services.json va inserito nel path android/app

per integrazione calendario
npm i react-native-big-calendar
