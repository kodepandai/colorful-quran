<script>
    import Icon from '@iconify/svelte';
</script>
<div class="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
    <div class="absolute bg-black opacity-30 inset-0 z-0"></div>
    <div class="w-full transition-transform duration-500 ease-linear max-w-xs relative mx-auto my-auto rounded-xl shadow-lg bg-white">
      <div class="px-3 float-right">
        <Icon icon="ant-design:close-circle-filled" width="30" height="30" />
      </div>
      <!--content-->
      <div class="p-4">
        <!--body-->
        <div class="flex flex-col">
            <!-- conten is dinamic -->
          <div class="border-b py-2 flex mb-3">
            <div class="w-12 flex justify-center bg-blue-500">
              <span>icon</span>
            </div>
            <span>Nama menu</span>
          </div>
          <div class="border-b py-2 flex mb-3">
            <div class="w-12 flex justify-center bg-blue-500">
              <span>icon</span>
            </div>
            <span>Nama menu</span>
          </div>
          <div class="border-b py-2 flex mb-3">
            <div class="w-12 flex justify-center bg-blue-500">
              <span>icon</span>
            </div>
            <span>Nama menu</span>
          </div>
          <div class="border-b py-2 flex mb-3">
            <div class="w-12 flex justify-center bg-blue-500">
              <span>icon</span>
            </div>
            <span>Nama menu</span>
          </div>
          <!-- end conten -->
        </div>
      </div>
    </div>
  </div>
  