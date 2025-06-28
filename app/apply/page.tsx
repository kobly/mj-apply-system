import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="p-10 space-y-6">
      <h1 className="text-2xl font-bold">🎉 ShadCN UI 설치 완료</h1>
      <Input placeholder="이름을 입력하세요" />
      <Button>신청서 이동</Button>
    </main>
  );
}
