import MongooseTsgen from "mongoose-tsgen"

export default async function generateTypes() {
  const tsgen = new MongooseTsgen([])
  const result = await tsgen.generateDefinitions({
    flags: {
      "dry-run": false,
      "no-format": false,
      "no-mongoose": false,
      "no-populate-overload": false,
      "dates-as-strings": false,
      debug: true,
      output: "./src/models/interfaces.gen.ts",
      project: "./",
    },
    args: {
      model_path: "./src/models",
    },
  })
  await result.sourceFile.save()
}
