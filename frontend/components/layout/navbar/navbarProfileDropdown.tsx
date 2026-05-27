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
        border-border
        bg-popover
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
          hover:bg-muted
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
          hover:bg-muted
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
          hover:bg-red-500/10
        "
      >
        Logout
      </MotionButton>
    </MotionDropdown>
  );
}
