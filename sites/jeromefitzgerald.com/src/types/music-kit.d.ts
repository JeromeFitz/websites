interface MusicKitInstance {
  authorize(): Promise<string>;
  musicUserToken: string;
}

interface MusicKitConstructor {
  configure(config: {
    app: { build: string; name: string };
    developerToken: string;
  }): Promise<MusicKitInstance>;
  getInstance(): MusicKitInstance;
}

declare const MusicKit: MusicKitConstructor;
