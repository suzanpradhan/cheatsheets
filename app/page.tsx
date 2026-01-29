import {Button} from "@mantine/core";
import {IconArrowNarrowRight} from "@tabler/icons-react";

export default function Home() {
  return (
    // <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    // </div>
      <div className={"flex min-h-screen items-center justify-center"}>
        <Button variant="outline" rightSection={<IconArrowNarrowRight />} >Hi</Button>
  </div>
  );
}
