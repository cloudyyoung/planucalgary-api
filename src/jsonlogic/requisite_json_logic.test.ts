import { RequisiteJsonLogic, Operator } from "./requisite_json_logic"

describe('RequisiteJsonLogic', () => {
  beforeAll(async () => {
    await RequisiteJsonLogic.populate_data()
  })

  it('should add a new operator', () => {
    const operator: Operator<any> = {
      name: 'testOperator',
      precedence: 5,
      is_satisfied: () => true,
      is_rule: (logic: any): logic is any => true,
    }
    RequisiteJsonLogic.add_operator(operator)
    expect(RequisiteJsonLogic.get_operator('testOperator')).toEqual(operator)
  })

  it('should have proper and operator', () => {
    const logic = {
      and: [
        "CPSC219",
        "CPSC355",
        {
          "or": [
            "CPSC410",
            "CPSC501",
            {
              "not": "CPSC600"
            },
          ]
        },
        {
          "units": 3,
          "from": ["CPSC217", "CPSC219"]
        }
      ]
    }
    const isLogic = RequisiteJsonLogic.is_rule(logic)
    expect(isLogic).toBeTruthy()
  })

  it("validate course, truthy", () => {
    const json = "CPSC217"
    const result = RequisiteJsonLogic.is_rule(json)
    expect(result).toBe(true)
  })
})
