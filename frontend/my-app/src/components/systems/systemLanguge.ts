import { link } from "fs";

export const menu = {
  user: {
    name: "system.header.users.user",
    child: [
      { id: "system.header.users.manageUser", link: "/system/user-crud" },
      { id: "system.header.users.manageDoctor", link: "/system/doctor" },
      { id: "system.header.users.manageAdmin", link: "/system/admin" },
    ],
  },
  leftContent: {
    languages: "system.header.languages.hello",
  },
};
export const banner = {
  form: {
    input1: "system.banner.form.email",
    input2: "system.banner.form.passWord",
    input3: "system.banner.form.firstName",
    input4: "system.banner.form.lastName",
    input5: "system.banner.form.phoneNumber",
    input6: "system.banner.form.address",
    input7: "system.banner.form.gender",
    input8: "system.banner.form.position",
    input9: "system.banner.form.avata",
    input10: "system.banner.form.submit",
    input11: "system.banner.form.edit",
    input12: "system.banner.form.role",
  },
};
