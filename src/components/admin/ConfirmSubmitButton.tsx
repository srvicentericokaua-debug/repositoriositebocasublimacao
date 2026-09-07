"use client";

export function ConfirmSubmitButton({
  children,
  className,
  message = "Tem certeza que deseja excluir? Essa ação não pode ser desfeita.",
}: {
  children: React.ReactNode;
  className?: string;
  message?: string;
}) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
