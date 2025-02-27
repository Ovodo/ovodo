const HeaderText = ({ title }: { title: string }) => {
  return (
    <h2 className='text-res_primary font-medium mb-3 uppercase border-res_primary text-3xl border-b-4 w-[95%]'>
      {title}
    </h2>
  );
};

export default HeaderText;
