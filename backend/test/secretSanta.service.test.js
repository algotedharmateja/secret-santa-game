const secretSantaService = require("../src/services/secretSanta.service");

describe("Secret Santa Service", () => {
  test("should assign each employee a unique Secret Child", () => {
    const employees = [
      { Employee_Name: "Alice", Employee_EmailID: "alice@example.com" },
      { Employee_Name: "Bob", Employee_EmailID: "bob@example.com" },
      { Employee_Name: "Charlie", Employee_EmailID: "charlie@example.com" },
    ];

    const assignments = secretSantaService.assignSecretSanta(
      employees,
      new Map()
    );

    // Ensure each employee has a unique Secret Child
    const assignedEmails = assignments.map((a) => a.Secret_Child_EmailID);
    expect(new Set(assignedEmails).size).toBe(employees.length);
  });

  test("should not assign an employee to themselves", () => {
    const employees = [
      { Employee_Name: "Alice", Employee_EmailID: "alice@example.com" },
      { Employee_Name: "Bob", Employee_EmailID: "bob@example.com" },
      { Employee_Name: "Charlie", Employee_EmailID: "charlie@example.com" },
    ];

    const assignments = secretSantaService.assignSecretSanta(
      employees,
      new Map()
    );

    // Check no one is assigned themselves
    assignments.forEach((a) => {
      expect(a.Employee_EmailID).not.toBe(a.Secret_Child_EmailID);
    });
  });

  test("should not assign the same Secret Child as the previous year", () => {
    const employees = [
      { Employee_Name: "Alice", Employee_EmailID: "alice@example.com" },
      { Employee_Name: "Bob", Employee_EmailID: "bob@example.com" },
      { Employee_Name: "Charlie", Employee_EmailID: "charlie@example.com" },
    ];

    const previousAssignments = new Map([
      ["alice@example.com", "bob@example.com"],
      ["bob@example.com", "charlie@example.com"],
      ["charlie@example.com", "alice@example.com"],
    ]);

    const assignments = secretSantaService.assignSecretSanta(
      employees,
      previousAssignments
    );

    // Ensure no one gets the same Secret Child as last year
    assignments.forEach((a) => {
      expect(a.Secret_Child_EmailID).not.toBe(
        previousAssignments.get(a.Employee_EmailID)
      );
    });
  });

  test("should throw an error if only one employee is provided", () => {
    const employees = [
      { Employee_Name: "Alice", Employee_EmailID: "alice@example.com" },
    ];

    expect(() =>
      secretSantaService.assignSecretSanta(employees, new Map())
    ).toThrow("Secret Santa assignment failed: No valid choices left!");
  });
});
