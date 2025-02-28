export const menu = {
  user: {
    name: "system.header.users.user",
    child: [
      { id: "system.header.users.manageUser", link: "/system/user-crud" },
      { id: "system.header.users.manageDoctor", link: "/system/doctor" },
      { id: "system.header.users.manageAdmin", link: "/system/admin" },
      {
        id: "system.header.users.manageSchedual",
        link: "/system/schedual-doctor",
      },
      { id: "system.header.users.manageClinic", link: "/system/clinic" },
    ],
  },
  speciality: {
    name: "system.header.speciality.name",
    child: [
      {
        id: "system.header.speciality.manageSpeciality",
        link: "/system/manage-speciality",
      },
    ],
  },
  doctor: {
    name: "system.header.users.user",
    child: [
      {
        id: "system.header.users.manageSchedual",
        link: "/system/schedual-doctor",
      },
      {
        id: "system.header.users.confirmSchedual",
        link: "/system/confirm-schedual",
      },
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
    input13: "system.banner.form.speciality",
  },
};
