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
      debug: false,
      output: "./src/interfaces/mongoose.gen.ts",
      project: "./",
    },
    args: {
      model_path: "./src/**/models.ts",
    },
  })
  await result.sourceFile.save()
}
