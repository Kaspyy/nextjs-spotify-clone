type SeekbarProps = {
  value: number;
  min: string;
  max: number;
  onInput: React.FormEventHandler<HTMLInputElement>;
  setSeekTime: (time: number) => void;
  appTime: number;
};

const Seekbar = ({
  value,
  min,
  max,
  onInput,
  setSeekTime,
  appTime,
}: SeekbarProps) => {
  const getTime = (time: number) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

  return (
    <div className='hidden flex-row items-center sm:flex'>
      <button
        type='button'
        onClick={() => setSeekTime(appTime - 5)}
        className='hidden text-white lg:mr-4 lg:block'
      >
        -
      </button>
      <p className='text-white'>{value === 0 ? '0:00' : getTime(value)}</p>
      <input
        type='range'
        step='any'
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className='mx-4 h-1 w-24 rounded-lg md:block md:w-56 2xl:mx-6 2xl:w-96'
      />
      <p className='text-white'>{max === 0 ? '0:00' : getTime(max)}</p>
      <button
        type='button'
        onClick={() => setSeekTime(appTime + 5)}
        className='hidden text-white lg:ml-4 lg:block'
      >
        +
      </button>
    </div>
  );
};

export default Seekbar;
