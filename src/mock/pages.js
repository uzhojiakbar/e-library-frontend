import FileUpload from "../Pages/FIleUpload";

const NavbarMock = [
  {
    id: 1,
    iconAwesome: "fa-solid fa-file-arrow-up",
    title: "Yuklash",
    path: "/file-upload",
    element: <FileUpload />,
    private: true,
    child: [],
    afterLogin: true,
  },
];

export { NavbarMock };
