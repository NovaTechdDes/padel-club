'use client';

import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, Phone, User, DollarSign } from 'lucide-react';
import { useReservaStore } from '@/src/store';
import { useMutateReserva } from '@/src/hooks/reservas/useMutateReserva';
import { mensaje } from '@/src/utils/mensaje';

export const ModalReserva = () => {
  const { cerrarModal, fecha: fechaStore, reservaSeleccionado, setReservaSeleccionado, hora_fin_seleccionado, hora_inicio_seleccionado, canchaSeleccionada } = useReservaStore();
  const { addReserva, putReserva, deleteReserva } = useMutateReserva();

  const [formData, setFormData] = useState({
    id: reservaSeleccionado ? reservaSeleccionado.id : '',
    nombre_cliente: reservaSeleccionado ? reservaSeleccionado.nombre_cliente : '',
    telefono_cliente: reservaSeleccionado ? reservaSeleccionado.telefono_cliente : '',
    fecha: reservaSeleccionado ? reservaSeleccionado.fecha.slice(0, 10) : fechaStore.toISOString().split('T')[0],
    hora_inicio: reservaSeleccionado ? reservaSeleccionado?.hora_inicio : hora_inicio_seleccionado,
    hora_fin: reservaSeleccionado ? reservaSeleccionado.hora_fin : hora_fin_seleccionado,
    precio: reservaSeleccionado ? reservaSeleccionado.precio : canchaSeleccionada?.precio,
    cancha_id: reservaSeleccionado ? reservaSeleccionado.cancha_id : canchaSeleccionada?.id,
    activo: true,

    fijo: reservaSeleccionado ? reservaSeleccionado.fijo : false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const limpiarDatos = () => {
    setReservaSeleccionado(null);
    setFormData({
      id: '',
      nombre_cliente: '',
      telefono_cliente: '',
      fecha: '',
      hora_inicio: '',
      hora_fin: '',
      precio: 0,
      cancha_id: '',
      activo: true,

      fijo: false,
    });
  };

  const handleModal = () => {
    limpiarDatos();
    cerrarModal();
  };

  const handleDeleteReserva = () => {
    if (reservaSeleccionado?.id) {
      console.log(reservaSeleccionado);
      deleteReserva.mutateAsync({ id: reservaSeleccionado.id, fijo: reservaSeleccionado.fijo ?? false });
      limpiarDatos();
      cerrarModal();
      mensaje('Reserva eliminada correctamente', 'success');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would call the store or API to save the reservation

    if (reservaSeleccionado) {
      const res = await putReserva.mutateAsync(formData);

      if (res) {
        limpiarDatos();
        cerrarModal();
        mensaje('Reserva modificada correctamente', 'success');
      }
      return;
    }

    const res = await addReserva.mutateAsync(formData);

    if (res) {
      limpiarDatos();
      cerrarModal();
      mensaje('Reserva agregada correctamente', 'success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm transition-opacity" onClick={handleModal} />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl transform transition-all animate-in slide-in-from-bottom sm:zoom-in-95 duration-300 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-100 bg-zinc-50/50">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
              {reservaSeleccionado ? `Modificar Reserva - ${canchaSeleccionada?.nombre}` : `Nueva Reserva - ${canchaSeleccionada?.nombre}`}
            </h2>
            <p className="text-sm text-zinc-500 font-medium">Completa los detalles del turno</p>
          </div>
          <button onClick={handleModal} className="p-2 rounded-full hover:bg-zinc-200/50 text-zinc-400 hover:text-zinc-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Cliente Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1">Nombre</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  name="nombre_cliente"
                  placeholder="Ej: Juan Pérez"
                  value={formData.nombre_cliente}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-black text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1">Teléfono</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="tel"
                  name="telefono_cliente"
                  placeholder="Ej: 3456123456"
                  value={formData.telefono_cliente}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 text-black bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all"
                />
              </div>
            </div>
          </div>

          <hr className="border-zinc-100" />

          {/* Fecha y Horario */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1">Fecha</label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 text-black bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1">Inicio</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="time"
                    name="hora_inicio"
                    value={formData.hora_inicio}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 border text-black border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1">Fin</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="time"
                    name="hora_fin"
                    value={formData.hora_fin}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 border text-black border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5 flex gap-5 mt-1">
              <label htmlFor="fijo" className="text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1">
                Turno Fijo
              </label>
              <input
                type="checkbox"
                name="fijo"
                id="fijo"
                checked={formData.fijo}
                onChange={(e) => setFormData({ ...formData, fijo: e.target.checked })}
                className="pl-10 scale-200 pr-4 py-3 bg-zinc-50 border text-black border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all"
              />
            </div>
          </div>

          <hr className="border-zinc-100" />

          {/* Precio */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 ml-1">Precio</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
              <input
                type="number"
                name="precio"
                placeholder="0"
                value={formData.precio}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-emerald-50/30 border border-emerald-100 rounded-xl text-sm font-bold text-emerald-700 placeholder:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          {/* Footer / Action */}
          <div className={`pt-2 ${reservaSeleccionado ? 'grid grid-cols-2 gap-4' : ''}`}>
            <button
              type="submit"
              className="w-full py-4 bg-zinc-900 text-white rounded-xl font-bold text-sm shadow-xl shadow-zinc-900/10 hover:bg-zinc-800 active:scale-[0.98] transition-all cursor-pointer"
            >
              {reservaSeleccionado ? 'Modificar Reserva' : 'Confirmar Reserva'}
            </button>
            {reservaSeleccionado && (
              <button
                type="button"
                onClick={handleDeleteReserva}
                className="w-full py-4 bg-red-800 text-white rounded-xl font-bold text-sm shadow-xl shadow-zinc-900/10 hover:bg-red-700 active:scale-[0.98] transition-all cursor-pointer"
              >
                Eliminar Reserva
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
