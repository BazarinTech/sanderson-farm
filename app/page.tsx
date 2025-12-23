'use client'

import { TabsDemo } from "@/components/shared/tabs";
import WalletCard from "@/components/shared/wallet-card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Page() {
return (
    <div className="px-2 py-4">
        <WalletCard />
        <Button onClick={() => toast.warning('My first toast')}>Click Me</Button>
        <TabsDemo />
    </div>
  );
}