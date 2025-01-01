import useTheme from "../Context/Theme";

export default function ThemeButton() {
  const { themeMode, lightTheme, darkTheme } = useTheme();

  const onChangeBtn = (e) => {
    const darkModeStatus = e.currentTarget.checked;
    if (darkModeStatus) {
      darkTheme();
    } else {
      lightTheme();
    }
  };

  return (
    <label className="relative items-center cursor-pointer ml-auto mr-10">
      <input
        onChange={onChangeBtn}
        checked={themeMode === "dark"}
        type="checkbox"
        value=""
        className="sr-only peer"
      />
      <div className="w-10 h-6 bg-cyan-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-700 dark:peer-focus:ring-cyan-950 rounded-full peer dark:bg-gray-700 peer-checked:bg-cyan-950 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-4 dark:border-gray-600"></div>
    </label>
  );
}


