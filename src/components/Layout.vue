<template>
  <nav class="fixed top-0 left-0 bottom-0 p-2 w-80 bg-slate-50 overflow-y-auto border-r">
    <slot name="nav" />
  </nav>
  <header
    class="fixed z-10 flex items-center justify-between pl-4 pr-4 top-0 left-80 right-0 h-14 border-b shadow-sm backdrop-blur-md"
  >
    <slot name="header" />
  </header>
  <main class="fixed left-80 pt-14 top-0 right-0 bottom-0">
    <slot name="main" />
  </main>
</template>
