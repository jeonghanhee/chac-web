export default function Footer() {
  return (
    <footer className="px-[clamp(24px,5vw,72px)] py-12 flex flex-col gap-3 max-md:py-10">
      <span className="font-sans text-[12px] tracking-[0.1em] uppercase text-dim">
        © {new Date().getFullYear()} CHAC
      </span>
    </footer>
  )
}
