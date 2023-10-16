const pinataSDK = require("@pinata/sdk");
const { Readable } = require("stream");
const pinataApiKey = "322452ef22f45b92a24d";
const pinataSecretApiKey =
  "b4d77a7cdaed578e754a5bcc1438702e0cd2e67462b2b2516f63b47d11eb1aef";

const pinata = new pinataSDK(pinataApiKey, pinataSecretApiKey);
export async function GET() {
  return Response.json({ message: "bala" });
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = await formData.get("file");
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    const options = {
      pinataMetadata: {
        name: file.name,
        keyvalues: {
          customKey: "customValue",
          customKey2: "customValue2",
        },
      },
      pinataOptions: {
        cidVersion: 0,
      },
    };
    const res = await pinata.pinFileToIPFS(stream, options);

    return Response.json({ message: "success", res });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "failure", error });
  }
}
