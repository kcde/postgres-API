import userStore from "../../models/user";
import { User, UserDetail } from "../../models/user";

describe("test user model", () => {
  //this value should have already been added to the db at migration
  const expectedUser: User = {
    id: 1,
    username: "jacky",
  };

  it("should return an Array of users when userStore.index is run", async () => {
    const response: User[] = await userStore.index();

    expect(response).toContain(expectedUser);
  });

  it("should return an object of a user", async () => {
    const response: User | undefined = await userStore.read("1");

    expect(response).toEqual(expectedUser);
  });
});
