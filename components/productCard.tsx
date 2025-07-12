export default function ProductCard({
  name,
  price,
  gift,
  cash,
}: {
  name: string;
  price: string;
  gift: string;
  cash: string;
}) {
  return (
    <div className="border rounded-md p-4 shadow-sm hover:shadow-md transition space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{name}</h3>
        <input type="checkbox" />
      </div>
      <div className="text-sm text-muted-foreground">💳 월 요금: {price}</div>
      <div className="text-sm">🎁 상품권: {gift}</div>
      <div className="text-sm">💰 현금: {cash}</div>
    </div>
  );
}
