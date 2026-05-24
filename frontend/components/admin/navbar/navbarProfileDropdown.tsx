import MotionButton from "@/components/motion/motionButton";
import MotionDropdown from "@/components/motion/motionDropdown";

interface Props {
  onLogout?: () => void;
}

export default function NavbarProfileDropdown({
  onLogout,
}: Props) {
  return (
    <MotionDropdown
      className="
        absolute
        right-0
        mt-2
        w-48
        rounded-xl
        border
        bg-white
        p-2
        shadow-lg
      "
    >
      <MotionButton
        className="
          w-full
          rounded-lg
          px-4
          py-2
          text-left
          transition
          hover:bg-gray-100
        "
      >
        Profile
      </MotionButton>

      <MotionButton
        className="
          w-full
          rounded-lg
          px-4
          py-2
          text-left
          transition
          hover:bg-gray-100
        "
      >
        Settings
      </MotionButton>

      <MotionButton
        onClick={onLogout}
        className="
          w-full
          rounded-lg
          px-4
          py-2
          text-left
          text-red-500
          transition
          hover:bg-red-50
        "
      >
        Logout
      </MotionButton>
    </MotionDropdown>
  );
}
