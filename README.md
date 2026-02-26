# Ma Liste de Courses

Application mobile de liste de courses, construite avec React + TypeScript + Vite et packagée pour Android via Capacitor.

## Prérequis

- [Node.js](https://nodejs.org/) >= 18
- [Java JDK](https://adoptium.net/) >= 17 (pour le build Android)
- [Android Studio](https://developer.android.com/studio) (SDK Android installé)

Assurez-vous que les variables d'environnement suivantes sont configurées :

```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

---

## Installation

```bash
npm install
```

---

## Développement web

```bash
npm run dev
```

Lance l'application sur `http://localhost:5173`.

---

## Build Android (APK)

### 1. Compiler l'app web et synchroniser avec Android

```bash
npm run build:android
```

Cette commande :
1. Compile le projet React/TS (`tsc -b && vite build`)
2. Copie le `dist/` dans le projet Android via `cap sync android`

### 2a. Builder l'APK via Android Studio (recommandé)

```bash
npm run open:android
```

Dans Android Studio :
- **Build → Build Bundle(s) / APK(s) → Build APK(s)**

L'APK de debug se trouve dans :
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### 2b. Builder l'APK en ligne de commande

```bash
cd android
./gradlew assembleDebug
```

L'APK se trouve dans :
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## Build APK de release (signé)

### 1. Créer une clé de signature (une seule fois)

```bash
keytool -genkey -v \
  -keystore ma-liste.jks \
  -alias ma-liste-key \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

> ⚠️ **Conservez précieusement le fichier `ma-liste.jks`** — sans lui, vous ne pourrez plus mettre à jour l'app. Ne le commitez jamais dans git.

Ajoutez `ma-liste.jks` dans le `.gitignore` :
```
ma-liste.jks
```

### 2. Configurer les variables de signature

Créez le fichier `android/key.properties` :

```properties
storePassword=VOTRE_MOT_DE_PASSE
keyPassword=VOTRE_MOT_DE_PASSE_CLE
keyAlias=ma-liste-key
storeFile=../../ma-liste.jks
```

> ⚠️ Ce fichier ne doit jamais être commité — ajoutez `android/key.properties` dans `.gitignore`.

### 3. Configurer Gradle pour utiliser la clé

Dans `android/app/build.gradle`, ajoutez avant `android {}` :

```groovy
def keyPropertiesFile = rootProject.file("key.properties")
def keyProperties = new Properties()
keyProperties.load(new FileInputStream(keyPropertiesFile))
```

Et dans le bloc `android {}` :

```groovy
signingConfigs {
    release {
        keyAlias keyProperties['keyAlias']
        keyPassword keyProperties['keyPassword']
        storeFile file(keyProperties['storeFile'])
        storePassword keyProperties['storePassword']
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

### 4. Builder l'APK release

```bash
npm run build:android
cd android
./gradlew assembleRelease
```

L'APK signé se trouve dans :
```
android/app/build/outputs/apk/release/app-release.apk
```

---

## Infos de l'app

| Champ | Valeur |
|---|---|
| App ID | `com.monapp.listecourses` |
| App Name | `Ma Liste de Courses` |
| Build type | APK |
