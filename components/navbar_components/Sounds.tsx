import React from "react";

interface SamplePack {
  name: string;
  image: string;
  keywords: string;
  files: Record<string, unknown>;
}

const Sounds: React.FC = () => {
  const Samplepacks: SamplePack = {
    name: "",
    image: "",
    keywords: "",
    files: {},
  };
  const Songs = undefined;
  const Loops = undefined;
  const Samples = undefined;

  const SoundsArray = [Samplepacks, Songs, Samples, Loops];

  console.log(SoundsArray);

  return (
    <div>
      <h1>Sounds</h1>
      <div className="holder">
        <div className="slideframe"></div>
      </div>
    </div>
  );
};

export default Sounds;
