export const ListWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[275px] h-full shrink-0 select-none">{children}</div>
  );
};
