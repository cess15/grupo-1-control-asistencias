package com.istb.app.services.user;

import java.util.List;
import java.util.Map;

import com.istb.app.entities.Usuario;

public interface UserService {
	List<Usuario> findAll();

	Map<String, String> save(Usuario usuario);

	Map<String, String> update(Usuario usuario);

	Usuario findById(int id);

	Usuario findByNombreUsuario(String nombreUsuario);

	Usuario findByProfesorCorreo(String correo);

	String encodePassword(String contrasena);

	boolean checkIfValidOldPassword(Usuario usuario, String oldPassword);

	void changeUserPassword(Usuario usuario, String password);

	void delete(int id);
}
