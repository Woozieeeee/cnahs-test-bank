export default function Navbar() {
  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        items-center
        justify-between
        border-b
        bg-white
        px-6
        py-4
      "
    >
      <h2
        className="
          text-xl
          font-semibold
        "
      >
        Dashboard
      </h2>

      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <div className="text-right">
          <p className="font-medium">Admin</p>

          <p
            className="
              text-sm
              text-gray-500
            "
          >
            Administrator
          </p>
        </div>

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-black
            text-white
            font-semibold
          "
        >
          A
        </div>
      </div>
    </header>
  );
}
