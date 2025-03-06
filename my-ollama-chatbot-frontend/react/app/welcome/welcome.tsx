import ChatComponent from "~/chat/ChatComponent";

export function Welcome() {
  return (
    <main className="flex items-center justify-center">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        {/* <AskComponent /> */}
        <ChatComponent />
      </div>
    </main>
  );
}
