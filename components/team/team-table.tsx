import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

function TeamTable({
  members,
}: {
  members: { account: string; referrer: string; depositStatus: string }[]
}) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs">Account</TableHead>
            <TableHead className="text-xs">Referrer</TableHead>
            <TableHead className="text-right text-xs">Deposit Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.length > 0 ? (
            members.map((member, index) => (
              <TableRow key={index}>
                <TableCell className="text-xs font-medium">{member.account}</TableCell>
                <TableCell className="text-xs">{member.referrer}</TableCell>
                <TableCell className="text-right">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs ${
                      member.depositStatus === "Active"
                        ? "bg-accent/20 text-accent"
                        : member.depositStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {member.depositStatus}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="py-8 text-center text-muted-foreground">
                No team members yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
export default TeamTable