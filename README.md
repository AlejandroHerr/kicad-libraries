# KiCad Libraries

My shared KiCad libraries, used across my projects.

## Libraries

### `synth_panel.pretty`

Footprints for building synth front panels (plates), not the circuit PCBs. They give the panel cutouts for pots and their matching knobs, switches, jacks and LEDs, plus silkscreen tick marks for knob scales.

| Footprint | Description |
| --- | --- |
| `Knob 1900H` | Pot cutout with a Davies 1900H-style knob |
| `Knob 1900H black_1` | 1900H knob, black variant |
| `Knob 1900H W` | 1900H knob, white variant |
| `Knob 1900H ticks` | Tick marks sized for the 1900H knob |
| `Knob 1900H ticks 11` | 11 tick marks sized for the 1900H knob |
| `Knob classic black` | Pot cutout with a classic knob, black |
| `Knob classic MFB black` | Pot cutout with an MFB-style classic knob, black |
| `Knob classic MFB W` | Pot cutout with an MFB-style classic knob, white |
| `Knob classic MFB Ticks` | Tick marks sized for the MFB classic knob |
| `Thonk Jack` | Thonkiconn 3.5 mm jack |
| `Thonk Jack_1` | Thonkiconn 3.5 mm jack, alternate version |
| `Thonk Jack W` | Thonkiconn 3.5 mm jack, white variant |
| `Switch_SPDT_3pos` | SPDT 3-position toggle switch |
| `Switch_SPST_2pos` | SPST 2-position toggle switch |
| `LED_3mm` | 3 mm LED |
| `ticks_11_7_8` | 11 ticks, radius 7 mm to 8 mm |
| `ticks_11_7_9` | 11 ticks, radius 7 mm to 9 mm |

The folder also holds the 3D models (`.step` / `.stp`) for the knobs, jacks, and switches.

#### Generating tick marks

`generate_ticks.js` writes a footprint of evenly spaced tick lines on `F.SilkS`. The ticks cover 270°, from -135° to +135°, centered at 12 o'clock.

```sh
cd synth_panel.pretty
node generate_ticks.js <numTicks> <startRadius> <endRadius>

# Example: 11 ticks from radius 7.5 mm to 9 mm
node generate_ticks.js 11 7.5 9
```

The output file is named `ticks_<numTicks>_<startRadius>_<endRadius>.kicad_mod`.

### `synth_pcb.pretty`

Footprints for the circuit PCBs: switches, pots, jacks, the IDC power header and LEDs. See [`synth_pcb.pretty/README.md`](synth_pcb.pretty/README.md).

## Design blocks

### `synth.kicad_blocks`

Reusable schematic blocks, such as the Eurorack power input. See [`synth.kicad_blocks/README.md`](synth.kicad_blocks/README.md).

## Setup

1. Clone this repo.
2. In KiCad, open **Preferences → Configure Paths** and add a `LIBRARIES` variable that points to the repo folder. The footprints find their 3D models through `${LIBRARIES}`.
3. Open **Preferences → Manage Footprint Libraries** and add `${LIBRARIES}/synth_panel.pretty` and `${LIBRARIES}/synth_pcb.pretty`.
4. Open **Preferences → Manage Design Block Libraries** and add `${LIBRARIES}/synth.kicad_blocks`.

## License

Unless noted below, everything in this repo is licensed under [CC-BY-SA 4.0](LICENSE). You can use, change and share it, including in commercial projects, as long as you give credit and share changes under the same license. PCBs and panels you make with these libraries are your own; the license doesn't apply to them.

## Credits and third-party files

These files weren't made by me, and their rights belong to their authors:

- **KiCad libraries:** `LED_D3.0mm`, `IDC-Header_2x05_P2.54mm_Vertical-NoSign` and `Jack_3.5mm_QingPu_WQP-PJ398SM_Vertical_CircularHoles_3d` in `synth_pcb.pretty` are based on footprints from the [KiCad libraries](https://gitlab.com/kicad/libraries), licensed CC-BY-SA 4.0 with the KiCad library exception.
- **3D models by tomma:** `Switch_SPDT_3pos.step`, `Switch_SPST_2pos.step` and `Thonk Jack.step` in `synth_panel.pretty`.
- **Third-party footprints:** `2MS1T1B5M2RE` and `M64Y102KB40` in `synth_pcb.pretty`.

If you're the author of one of these files and want it credited differently or removed, please open an issue.
