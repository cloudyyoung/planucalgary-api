import { RequisitesSimpleProps, RequisitesSimpleRuleProps, RequisitesSimpleRuleValueProps, RequisitesSimpleRuleValueValuesProps } from "./types";

class RequisitesSimple {
  private requisitesSimple: RequisitesSimpleProps;
  private rules: RequisitesSimpleRule[];

  constructor(requisites: RequisitesSimpleProps) {
    this.requisitesSimple = requisites;
    this.rules = requisites.rules.map(rule => new RequisitesSimpleRule(rule));
  }
}

class RequisitesSimpleRule {
  private rule: RequisitesSimpleRuleProps;
  private value: string | RequisitesSimpleRuleValue;

  constructor(rule: RequisitesSimpleRuleProps) {
    this.rule = rule;
    this.value = typeof rule.value === "string" ? rule.value : new RequisitesSimpleRuleValue(rule.value);
  }
}

class RequisitesSimpleRuleValue {
  private value: RequisitesSimpleRuleValueProps;
  private values: RequisitesSimpleRuleValueValues[];

  constructor(value: RequisitesSimpleRuleValueProps) {
    this.value = value;
    this.values = value.values.map(values => new RequisitesSimpleRuleValueValues(values));
  }
}

class RequisitesSimpleRuleValueValues {
  private values: RequisitesSimpleRuleValueValuesProps;
  private value: string[];

  constructor(values: RequisitesSimpleRuleValueValuesProps) {
    this.values = values;
    this.value = values.value;
  }
}

export default RequisitesSimple;
export { RequisitesSimple };